import jwt
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.hash import bcrypt
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model

JWT_SECRET = 'myjwtsecret'

app = FastAPI()
origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Task(BaseModel): #defining elements of the request sheet
    id: str
    content: str

class Tasks(BaseModel):
    __root__: dict[str, Task]

class Column(BaseModel):
    id: str
    title: str
    taskIds: list
    description: str

class Columns(BaseModel):
    __root__: dict[str, Column]

class Board(BaseModel):
    tasks: Tasks
    columns: Columns
    columnOrder: list

class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(50, unique=True)
    password = fields.CharField(200)
    board = fields.JSONField(default={"tasks": {}, "columns": {}, "columnOrder": []})

    def verify_password(self, password):
        return bcrypt.verify(password, self.password)

User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True, exclude=('board',))

async def authenticate_user(username: str, password: str): #user authentication
    user = await User.get(username=username)
    if not user:
        return False
    if not user.verify_password(password):
        return False
    return user

oauth2_scheme = OAuth2PasswordBearer(tokenUrl='token')

async def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=['HS256'])
        user = await User.get(id=payload.get('id'))
    except:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or password'
        )

    return await User_Pydantic.from_tortoise_orm(user)


@app.get('/board') #get request sheet for admin
async def get_board(user: User_Pydantic = Depends(get_current_user)):
    user = await User.get(id=user.id)
    return {'board': user.board}

@app.get('/requestsheet') #get request sheet for client
async def get_request_sheet():
    user = await User.get(id=1)
    return {'board': user.board}
    
@app.get('/requests') #get request sheet for employees
async def get_request():
    user = await User.get(id=2)
    return {'board': user.board}

@app.post('/board') #admin posts request sheet
async def save_board(board: Board, user: User_Pydantic = Depends(get_current_user)):
    user = await User.get(id=user.id)
    user.board = board.json()
    await user.save()

    return {"status": "success"}

@app.post('/requestsheet') #client posts request
async def save_request(board: Board):
    user = await User.get(id=2)
    user.board = board.json()
    await user.save()

    return {"status": "success"}

@app.post('/requests') #employee posts done requests
async def save_done_request(board: Board, user: User_Pydantic = Depends(get_current_user)):
    user = await User.get(id=user.id)
    user.board = board.json()
    await user.save()

    return {"status": "success"}

@app.post('/users') #user creation
async def create_user(user_in: UserIn_Pydantic):
    user = User(username=user_in.username, password=bcrypt.hash(user_in.password))
    await user.save()
    user_obj = await User_Pydantic.from_tortoise_orm(user)
    
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {'access_token': token}

@app.post('/token') #token generation
async def generate_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail='Invalid username or password'
        )

    user_obj = await User_Pydantic.from_tortoise_orm(user)
    token = jwt.encode(user_obj.dict(), JWT_SECRET)
    return {'access_token': token}

register_tortoise(
    app,
    db_url='postgres://postgres:Password1@127.0.0.1:5432/postgres',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)
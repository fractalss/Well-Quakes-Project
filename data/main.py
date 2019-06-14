import sqlite3
import pandas as pd

# load data
df = pd.read_csv('loving.csv')

# strip whitespace from headers
df.columns = df.columns.str.strip()

df.dropna()

#import mysql.connector
from sqlalchemy import create_engine

engine = create_engine('mysql+pymysql://xs3a36vxsocpwln7:bhkfay3z4duniyef@mgs0iaapcj3p9srz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/o0ot0vgk7yw8hhu1', echo=False)
df.to_sql(name='table2', con=engine, if_exists = 'append', index=False)

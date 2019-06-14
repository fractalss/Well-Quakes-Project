import sqlite3
import pandas as pd

# load data
df = pd.read_csv('loving.csv')

# strip whitespace from headers
df.columns = df.columns.str.strip()

df.dropna()
con = sqlite3.connect("wells.sqlite")

# drop data into database
df.to_sql("well_data", con)

con.close()
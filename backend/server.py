from flask import Flask
from flask import request
from flask_cors import CORS
import json
import csv
import math

app = Flask(__name__)

CORS(app)


@app.route("/stock/listing",methods=["GET"])
def sendInfo():

    page=request.args.get("page",default=1,type=int)
    per_page=request.args.get("per_page",default=10,type=int)

    list1=[]

    with open("data/info.csv","r") as file_handler:
        file_content = csv.DictReader(file_handler)
        
        for x in file_content:
            dict1={}
            for key,val in x.items():
                dict1[key]=val
            list1.append(dict1)
    
    total_pages=math.ceil(len(list1)/per_page)

    start=(page-1)*per_page
    end=page*per_page

    data=list1[start:end]

    return json.dumps({
        "total_pages":total_pages,
        "current_page":page,
        "data":data
    })

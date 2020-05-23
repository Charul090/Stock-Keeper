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


@app.route("/stock/add/<user_id>",methods=["GET","POST"])
def addItem(user_id):
    if request.method == "GET":
        data=""

        with open("data/info.csv","r") as file_handler:
            file_content=csv.DictReader(file_handler)

            for x in file_content:
                if x["stock_id"] == user_id:
                    data=x
                    break
                    
        return json.dumps({
            "data":data
        })
    else:
        if request.method == "POST":
            add=request.json["add"]
            time=request.json["time"]

            list1 = []
            diff = {}

            with open("data/info.csv","r") as file_handler:
                file_content=csv.DictReader(file_handler)

                for x in file_content:
                    list1.append(x)

            

            for x in range(len(list1)):

                if list1[x]["stock_id"] == user_id:
                    quantity = int(list1[x]["quantity"])+int(add)

                    dict1={
                        "stock_id":list1[x]["stock_id"],
                        "quantity":quantity,
                        "item":list1[x]["item"],
                        "price":list1[x]["price"]
                    }
                    
                    list1[x]=dict1
                

            headers=list1[0].keys()

            

            with open("data/info.csv","w") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers)

                csv_write.writeheader()
                csv_write.writerows(list1)


            return json.dumps({
                "message":"Item added Successfully"
            })


@app.route("/stock/reduce/<user_id>",methods=["GET","POST"])
def reduceItem(user_id):
    if request.method == "GET":
        data=""

        with open("data/info.csv","r") as file_handler:
            file_content=csv.DictReader(file_handler)

            for x in file_content:
                if x["stock_id"] == user_id:
                    data=x
                    break
                    
        return json.dumps({
            "data":data
        })
    
    else:
        if request.method == "POST":
            remove=request.json["remove"]
            time=request.json["time"]


            list1=[]

            diff={}

            with open("data/info.csv","r") as file_handler:
                file_content = csv.DictReader(file_handler)
                for x in file_content:
                    list1.append(x)

            for x in range(len(list1)):

                if list1[x]["stock_id"] == user_id:
                    quantity = int(list1[x]["quantity"]) - int(remove)

                    dict1={
                        "stock_id":list1[x]["stock_id"],
                        "quantity":quantity,
                        "item":list1[x]["item"],
                        "price":list1[x]["price"]
                    }
                    
                    list1[x]=dict1
                

            headers=list1[0].keys()

            

            with open("data/info.csv","w") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers)

                csv_write.writeheader()
                csv_write.writerows(list1)


            return json.dumps({
                "message":"Item reduced Successfully"
            })
            


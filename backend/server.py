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

    zero=0
    low=0


    with open("data/info.csv","r") as file_handler:
        file_content = csv.DictReader(file_handler)
        
        for x in file_content:
            dict1={}
            for key,val in x.items():
                if key == "quantity" and int(val) == 0:
                    zero+=1

                if key == "quantity" and int(val) <= 6:
                    low+=1

                dict1[key]=val
            list1.append(dict1)
    
    total_pages=math.ceil(len(list1)/per_page)

    start=(page-1)*per_page
    end=page*per_page

    data=list1[start:end]

    return json.dumps({
        "zero_stock":zero,
        "low_stock":low,
        "total_pages":total_pages,
        "current_page":page,
        "data":data
    })


@app.route("/stock/add/<stock_id>",methods=["GET","POST"])
def addItem(stock_id):
    if request.method == "GET":
        data=""

        with open("data/info.csv","r") as file_handler:
            file_content=csv.DictReader(file_handler)

            for x in file_content:
                if x["stock_id"] == stock_id:
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

                if list1[x]["stock_id"] == stock_id:
                    quantity = int(list1[x]["quantity"])+int(add)

                    diff={
                        "stock_id":stock_id,
                        "item":list1[x]["item"],
                        "quantity":add,
                        "operation":"add",
                        "time":time
                    }

                    dict1={
                        "stock_id":list1[x]["stock_id"],
                        "quantity":quantity,
                        "item":list1[x]["item"],
                        "price":list1[x]["price"],
                        "unit":list1[x]["unit"]
                    }
                    
                    list1[x]=dict1
                

            headers1=list1[0].keys()

            headers2 = diff.keys()

            
            with open("data/history.csv","a") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers2)
                csv_write.writerow(diff)
            

            with open("data/info.csv","w") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers1)

                csv_write.writeheader()
                csv_write.writerows(list1)


            return json.dumps({
                "message":"Item added Successfully"
            })


@app.route("/stock/reduce/<stock_id>",methods=["GET","POST"])
def reduceItem(stock_id):
    if request.method == "GET":
        data=""

        with open("data/info.csv","r") as file_handler:
            file_content=csv.DictReader(file_handler)

            for x in file_content:
                if x["stock_id"] == stock_id:
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

                if list1[x]["stock_id"] == stock_id:
                    quantity = int(list1[x]["quantity"]) - int(remove)

                    diff={
                        "stock_id":stock_id,
                        "item":list1[x]["item"],
                        "quantity":remove,
                        "operation":"reduce",
                        "time":time
                    }

                    dict1={
                        "stock_id":list1[x]["stock_id"],
                        "quantity":quantity,
                        "item":list1[x]["item"],
                        "price":list1[x]["price"],
                        "unit":list1[x]["unit"]
                    }
                    
                    list1[x]=dict1
                

            headers1=list1[0].keys()

            headers2=diff.keys()

            with open("data/history.csv","a") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers2)
                csv_write.writerow(diff)

            

            with open("data/info.csv","w") as file_handler:
                csv_write=csv.DictWriter(file_handler,fieldnames=headers1)

                csv_write.writeheader()
                csv_write.writerows(list1)


            return json.dumps({
                "message":"Item reduced Successfully"
            })
            
@app.route("/stock/history",methods=["GET"])
def sendHistoryInfo():
    page = request.args.get("page",default=1,type=int)

    per_page = request.args.get("per_page",default=10,type=int)

    list1=[]

    with open("data/history.csv","r") as file_handler:
        file_content=csv.DictReader(file_handler)

        for x in file_content:
            dict1={}
            for key,val in x.items():
                dict1[key]=val
            list1.append(dict1)
    
    total_pages = math.ceil(len(list1)/per_page)

    list1=list1[::-1]

    start = (page - 1) * per_page
    end = page * per_page

    list1=list1[start:end]
    
    return json.dumps({
        "total_pages":total_pages,
        "current_page":page,
        "data":list1
        })

@app.route("/stock/delete",methods=["POST"])
def deleteItem():
    stock_id=str(request.json["stock_id"])
    time=request.json["time"]

    diff={}

    diff["stock_id"] = stock_id
    

    list1=[]
    with open("data/info.csv","r") as file_handler:
        file_content=csv.DictReader(file_handler)

        for x in file_content:
            if x["stock_id"] == stock_id:
                
                diff["item"]=x["item"]
                diff["quantity"]="N/A"
                diff["operation"]="delete"
                diff["time"]=time

                continue
            else:
                list1.append(x)
    
    headers1=list1[0].keys()
    headers2=diff.keys()

    with open("data/history.csv","a") as file_handler:
        csv_write=csv.DictWriter(file_handler,fieldnames=headers2)
        csv_write.writerow(diff)

    with open("data/info.csv","w") as file_handler:
        csv_write=csv.DictWriter(file_handler,fieldnames=headers1)

        csv_write.writeheader()
        csv_write.writerows(list1)
    
    return json.dumps({"message":"Item Deleted Successfully"})


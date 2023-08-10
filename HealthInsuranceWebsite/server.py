from crypt import methods
from pydoc import render_doc
from statistics import mode
from flask import Flask, request, render_template, url_for
import joblib
import sklearn
import numpy as np
import xgboost as xgb


app = Flask(__name__, template_folder="templates", static_folder="statics")

model = joblib.load("model.h5")
scaler = joblib.load("scaler.h5")


@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")


@app.route("/result", methods=["POST"])
def result():

    print("we are inside resulr()")

    input = []

    age = request.form.get("age")
    bmi = request.form.get("bmi")
    children = request.form.get("children")
    smoker = request.form.get("smoker")
    gender = request.form.get("gender")
    region = request.form.get("region")

    print(f"{age}: {bmi}: {children}: {smoker}: {gender}: {region}")

    input.append(age)
    input.append(bmi)
    input.append(int(children))

    if smoker == "no":
        input.append(1)
    else:
        input.append(0)

    if gender == "male":
        input.append(1)
    else:
        input.append(0)

    arrayOfRegions = ["northeast", "northwest", "southeast"]
    regionValues = [0, 0, 0]
    if region in arrayOfRegions:
        index = arrayOfRegions.index(region)
        regionValues[index] = 1
    else:
        pass

    for i in regionValues:
        input.append(i)

    scaling_Age_And_BMI = scaler.transform(np.array([[input[0], input[1]]]))

    input[0] = np.round(scaling_Age_And_BMI[0][0], decimals=4)
    input[1] = np.round(scaling_Age_And_BMI[0][1], decimals=4)

    predict = model.predict(np.array([input]))

    print(f"prediction: {predict[0].astype('int')}")
    return render_template("index.html", predictedPrice=str(predict[0].astype("int")))


if __name__ == "__main__":
    print("Server is on ...")
    app.run()

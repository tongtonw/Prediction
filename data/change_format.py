import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

Data = pd.read_csv(r"D:\Cases\gunnerus-web-demo\data\modelPredictor.csv")

line = 32
N = []
E = []

cols = Data.columns
preCount = 0

while line <= len(Data):
    for i in range(2, len(cols), 2):
        N.append(Data.loc[line, cols[i]])
        E.append(Data.loc[line, cols[i + 1]])
    line += 30
    preCount += 1
    print(preCount)

predict = np.array([N, E]).T
Ans = pd.DataFrame(predict, columns=["northpre", "eastpre"])
print(len(Ans)/166)

# Ans.to_csv('D:/Cases/gunnerus-web-demo/data/pre1.csv', index=False)
# plt.plot(Ans.northpre, Ans.eastpre, 'b')
# actual = pd.read_csv(r"D:\Cases\gunnerus-web-demo\data\vesselModel.csv")
# plt.plot(actual.iloc[:, 2], actual.iloc[:, 3], 'r')
# plt.show()
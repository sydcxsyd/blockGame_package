# -*- coding:utf-8 -*- 
import xlrd
import types
from datetime import date,datetime
import json

filePath = ""
outDir = "..\\assets\\Script\\BaseData\\"
def read_table(table,outFileName):
	nrows = table.nrows
	data = {}
	templateList = []
	id = 0	
	for i in range(1 ,nrows):		
		colData = table.row_values(i)
		temp_rowData = {}
		for j in range(len(colData)):
			value = colData[j]
			if i == 1 : #第一行配置的是字段名字
				templateList.append(str(value))				
			else:							
				if isinstance(value,float) or isinstance(value,float):
					value = int(value)
					print value
				elif not isinstance(value, unicode):
					value = int(value)
					print value
				else :
					value = value.encode("utf-8")
					print value
				if j == 0:
					id = value				
				temp_rowData[templateList[j]] = value
		if not i == 1:
			data[id] = temp_rowData
		
	outPath = outDir + outFileName + ".js"

	data_string = json.dumps(data,indent=1)
	data_string = "window.G_" + outFileName + " = " + data_string
	print data_string
	f = open(outPath, 'w')
	f.write(data_string)
	f.close()


def read_excel(excelName,outFileName):
	# 打开文件
	data = xlrd.open_workbook(filePath + excelName)
	table = data.sheets()[0]
	read_table(table,outFileName)
	

read_excel("Stock.xlsx","Stock")
read_excel("PlatformRes.xlsx","PlatformRes")
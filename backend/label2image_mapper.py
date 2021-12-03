import json

input_path = "backend"
output_path = "data"
filename = "beach"

jsonData = None
with open(f"{output_path}/{filename}.json") as f:
    jsonData = json.load(f)

label2image_map = {}
for imageName, labels in jsonData.items():
    for label in labels:
        labelName = label["item_name"]
        if labelName in label2image_map:
            label2image_map[labelName].append(imageName)
        else:
            label2image_map[labelName] = [imageName]
    break
print (label2image_map)

import json

input_path = "backend"
output_path = "data"
filename = "times_square"

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

# print (label2image_map)

with open(f"{output_path}/map_{filename}.json", "w+") as f:
    json.dump(label2image_map, f, indent=4)


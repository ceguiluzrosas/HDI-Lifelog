import json

jsonData = []
path = "backend"
filename = "central_park"
with open(f"{path}/{filename}.json") as f:
  jsonData = json.load(f)

# key -> value
# filename -> [{"item_name": xxx, "avg_conf": yyyy, "max_conf": yyyy, "min_conf": yyyy, "count": zzzz}]
data = {}
setOfLabels = set()
for item in jsonData:
    imageFilename = item["filename"].partition(filename + "/")[-1]
    data[imageFilename] = []

    temp = {} # itemName -> [conf1, conf2, ...]
    tempSetOfLabel = set()
    for detectedObj in item["objects"]:
        itemName = detectedObj["name"]
        tempSetOfLabel.add(itemName)
        confidence = detectedObj["confidence"]
        if itemName in temp:
            temp[itemName].append(confidence)
        else:
            temp[itemName] = [confidence]
    setOfLabels.update(tempSetOfLabel)

    for itemName in tempSetOfLabel:
        classification = {}
        confidences = temp[itemName]
        classification["item_name"] = itemName
        classification["count"] = len(confidences)
        classification["avg_conf"] = sum(confidences) / len(confidences)
        classification["max_conf"] = max(confidences)
        classification["min_conf"] = min(confidences)
        data[imageFilename].append(classification)

output_path = "data"
with open(f"{output_path}/{filename}.json", "w+") as f:
    json.dump(data, f, indent=4)

print (setOfLabels)
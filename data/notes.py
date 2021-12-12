import json

######################################

data = None
file = "times_square"
with open(f"/Users/carloseguiluzrosas/SchoolDir/HDI/Research/data/relations_{file}.json") as f:
    data = json.load(f)

temporal_output = {}
spatial_output = {}

temporal_set = set()
spatial_set = set()
for filename, relations in data.items():
    temporal_array = relations["temporal"]
    spatial_array = relations["spatial"]

    for relation in temporal_array:
        temporal_set.add(relation)
        if relation in temporal_output:
            temporal_output[relation].append(filename)
        else:
            temporal_output[relation] = [filename]

    for relation in spatial_array:
        spatial_set.add(relation)
        if relation in spatial_output:
            spatial_output[relation].append(filename)
        else:
            spatial_output[relation] = [filename]

with open(f"map_temporalRelations_{file}.json", "w+") as f:
    json.dump(temporal_output, f, indent=4)

with open(f"map_spatialRelations_{file}.json", "w+") as f:
    json.dump(spatial_output, f, indent=4)

print (temporal_set)
print (spatial_set)

######################################

# data = None
# file = "times_square"
# with open(f"/Users/carloseguiluzrosas/SchoolDir/HDI/Research/data/{file}.json") as f:
#     data = json.load(f)
# filenames = []
# for filename in data:
#     name = filename.split(".")[0]
#     filenames.append(name)

# filenames = sorted(filenames)
# print (filenames)


# data = {}
# for num in filenames:
#     data[num + ".jpg"] = {
#         "spatial": [],
#         "temporal": [],
#     }

# with open(f"./data/relations_{file}.json", "w+") as f:
#     json.dump(data, f, indent=4)
import os 

files = os.listdir()

count = 0

for item in files:

    if item == "renamer.py":
        continue

    
    
    
    item_ = item.replace("‐", "-")
    new_name_split = item_.split("-")

    if item_.split("-")[0] == "LM" or item_.split("-")[0] == "LLM":
        continue


    if "LM" in new_name_split:
        new_name = "-".join(new_name_split[new_name_split.index("LM"):])
    elif "LLM" in new_name_split:
        new_name = "-".join(new_name_split[new_name_split.index("LLM"):])


    without_ext = new_name.replace(".png", "").split(" ")
    
    print(without_ext)
    if without_ext[1] == "1":
        new_name = new_name.replace(" 1", "")

        print(new_name)
        os.rename( item , new_name)
        count +=1
print(len(files), count)
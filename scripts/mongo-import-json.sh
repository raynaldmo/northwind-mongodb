for f in *.json
do
    filename=$(basename "$f")
    extension="${filename##*.}"
    filename="${filename%.*}"
    mongoimport -d Northwind -c "$filename" --type json --jsonArray --file "$f"
done

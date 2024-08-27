const formData = new FormData();
formData.append("title", bookName);
formData.append("explanation", explanation);

const appendMultipleValues = (key, values) => {
  values
    .split(",")
    .map((value) => value.trim())
    .forEach((value) => formData.append(key, value));
};

appendMultipleValues("authors", author);
appendMultipleValues("publishers", publisher);
appendMultipleValues("genres", genre);

formData.append("file", bookImage);

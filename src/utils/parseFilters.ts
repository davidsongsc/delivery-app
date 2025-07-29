import dayjs from "dayjs";

export const parseFilters = (filters: object) => {
  let parsedFilters = "";
  if (!!filters) {
    let filterBy = "";
    let filterValue = "";
    let filterType = "";

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        if (key === "created_at") {
          if (dayjs(value?.split("|")[0]).isValid()) {
            filterBy += filterBy.length > 0 ? "," + key : key;
            filterValue += filterValue.length > 0 ? "," + value : value;
            filterType += filterType.length > 0 ? ",btw" : "btw";
          }
        } else if (
          value === null && ![
            "title",
            "name",
            "email",
            "description",
            "user.name",
            "phone",
            "is_active",
          ].includes(key)
        ) {
          const keyValue = key;
          filterBy += filterBy.length > 0 ? "," + keyValue : keyValue;
          filterValue += filterValue.length > 0 ? "," + value : value;
          filterType += filterType.length > 0 ? ",like" : "like";
        } else {
          filterBy += filterBy.length > 0 ? "," + key : key;
          filterValue += filterValue.length > 0 ? "," + value : value;
          filterType +=
            (filterType.length > 0 ? "," : "") +
            (value.toString()?.includes("|") ? "in" : "eq");
        }
      } else if (value === null && !["name", "status"].includes(key)) {
        filterBy += filterBy.length > 0 ? "," + key : key;
        filterValue += filterValue.length > 0 ? ",null" : "null";
        filterType += filterType.length > 0 ? ",is_null" : "is_null";
      }
    });

    parsedFilters = `&filterBy=${filterBy}&filterValue=${filterValue}&filterType=${filterType}`;
  }
  return parsedFilters;
};

export const formattedDate = (dateString, options) => {
  const formattedDate = new Date(dateString).toLocaleString("en-US");
  return formattedDate;
};


export const correctFormattedDate = (dateString)=>{
  var dateObject = new Date(dateString);

// Format the date
var formattedDate = ("0" + dateObject.getUTCDate()).slice(-2) + "/" +
                    ("0" + (dateObject.getUTCMonth() + 1)).slice(-2) + "/" +
                    dateObject.getUTCFullYear().toString().slice(-2) 
                   
return formattedDate
}
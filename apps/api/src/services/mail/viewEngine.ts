const path = require("path");

const handlebarOptions:any = {
  viewEngine: {
    extName: ".handlebars",
    partialsDir: path.resolve(__dirname, "template"),
    defaultLayout: false,
  },
  viewPath: path.resolve(__dirname, "template"),
  extName: ".handlebars",
};

export default handlebarOptions;
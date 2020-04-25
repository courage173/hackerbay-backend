import * as jsonpatch from 'fast-json-patch';


const jsonPatch = (req, res) => {
  const { jsonObject, jsonPatchObject } = req.body;
  if (!jsonObject) {
    return res.status(400).json({
      status: 'error',
      message: 'no json object found'
    });
  }
  if (!jsonPatchObject) {
    return res.status(400).json({
      status: 'error',
      message: 'no jsonPatchObject object found'
    });
  }
  const newFile = jsonpatch.applyPatch(jsonObject, jsonPatchObject).newDocument;
  return res.status(200).json({
    status: 'success',
    jsonObject: newFile
  });
};

export default jsonPatch;

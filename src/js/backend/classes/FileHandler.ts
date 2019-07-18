import Ajv from "ajv";

export enum JSONSchema {
    BOARD = "board",
    DELEGATES = "delegates",
    MANDATE = "mandate"
}

export default class FileHandler
{

    public static read(file: File)
    {
        const reader : FileReader = new FileReader();

        return new Promise((resolve, reject) => {
            reader.onerror = () => {
                reader.abort();
                reject(new DOMException("Error parsing file"));
            };

            reader.onload = () => {
                resolve(reader.result);
            };

            reader.readAsText(file);
        });
    }

    public static validate(json: string, schema: JSONSchema)
    {
        let ajv = new Ajv();
        let valid = ajv.validate(this.get_schema(schema), json);
        return valid;
    }

    private static get_schema(schema: JSONSchema)
    {
        switch(schema)
        {

            case JSONSchema.BOARD:
            case JSONSchema.DELEGATES:
            case JSONSchema.MANDATE:
                return {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "url": {
                                "type": "string"
                            },
                            "name": {
                                "type": "string"
                            },
                            "email": {
                                "type": "string"
                            },
                            "function": {
                                "type": "string"
                            },
                            "statement": {
                                "type": "string"
                            }
                        }
                    },
                    "minItems": 1 
                }
        }
    }

}
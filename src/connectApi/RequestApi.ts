const URL: string = "http://localhost:8080/api/";

export const getAll = async (param: string) => {
    try {
        const response = await fetch(`${URL + param}`);
        return await response.json();

    } catch (error) {
        console.log("Error on get all ", param);
        console.log(error);
    }
}

export const getById = async (param: string, id: string) => {
    try {
        const response = await fetch(`${URL + param + "/" + id}`)
        return await response.json();

    } catch (error) {
        console.log("Error on get ", param, " with id ", id);
        console.log(error);
    }
}

export const deleteById = async (param: string, id: string) => {
    try {
        const response = await fetch(`${URL + param + "/" + id}`, {
            method: "DELETE"
        })
        return await response.status;
    } catch (error) {
        console.log("Error on delete ", param, " with id ", id);
        console.log(error);
    }
}

export const create = async (param:string, body: any) => {
    try {
        const response = await fetch(`${URL + param}`, {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        return await response.status;
    } catch (error) {
        console.log("Error on create ", param);
        console.log(error);
    }
}
const { validation, survivorCount } = require("../src/controllers");

let res;
let next;

beforeEach(async () => {

  const send = jest.fn()
  const json = jest.fn()

  const status = jest.fn(() => ({
    send,
    json
  }))

  res = {
    status,
    send,
    json
  }
  next = jest.fn()

});

describe("validation", () => {

  it("should proceed to the next controller if payload is correct", () => {
    const req = {
      body: {
        binField: "Age",
        binBoundaries: [5, 10, 15],
        data: []
      }
    }

    validation(req, res, next)

    expect(res.status).not.toHaveBeenCalled()
    expect(res.send).not.toHaveBeenCalled()
    expect(next).toHaveBeenCalledWith()
  })

  it("should send 400 response if binField is incorrect", () => {
    const req = {
      body: {
        binField: "Banana",
        binBoundaries: [5, 10, 15],
        data: []
      }
    }

    validation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      "errors": [
        "binField: 'Banana' is not a valid field."
      ]
    })
    expect(next).not.toHaveBeenCalled()
  })

  it("should send 400 response if binBoundaries is incorrect", () => {
    const req = {
      body: {
        binField: "Age",
        binBoundaries: ['5', '10', '15'],
        data: []
      }
    }

    validation(req, res, next)

    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.send).toHaveBeenCalledWith({
      "errors": [
        "binBoundaries: need to be in ascending order.",
        "binBoundaries: should only contain numeric values.", ,
      ]
    })
    expect(next).not.toHaveBeenCalled()
  })

})


describe("survivorCount", () => {
  it("should return with a status code of 200 on success responses", ()=>{

    const req = {
      body: {
        binField: "Age",
        binBoundaries: [5, 10, 15],
        data: [
          {
            Survived: 1,
            Age: 15,
          },
          {
            Survived: 1,
            Age: 60,
  
          },
          {
            Survived: 1,
            Age: 55,
          },
          {
            Survived: 1,
            Age: 3,
  
          }
        ]
      }
    }

    survivorCount(req, res, next)    

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({"counts": [1, 0, 0, 3]})
  })

})
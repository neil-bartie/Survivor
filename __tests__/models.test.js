const { transformData } = require("../src/models")

describe("transformData", () => {

  it("should split data into correct bins", () => {

    const payload = {
      binField: "Age",
      binBoundaries: [10, 20, 50],
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

    const response = transformData(payload)

    expect(response).toEqual({ "counts": [1, 1, 0, 2] })
  })

  test("whether bins include data in the lower bound and exclude data on the upper bound", () => {

    const payload = {
      binField: "Age",
      binBoundaries: [10, 20, 50],
      data: [
        {
          Survived: 1,
          Age: 10,
        },
        {
          Survived: 1,
          Age: 20,

        },
        {
          Survived: 1,
          Age: 20,
        },
        {
          Survived: 1,
          Age: 50,

        }
      ]
    }

    const response = transformData(payload)

    expect(response).toEqual({ "counts": [0, 1, 2, 1] })
  })

  it("should exclude non survivors", () => {

    const payload = {
      binField: "Age",
      binBoundaries: [10, 20, 50],
      data: [
        {
          Survived: 1,
          Age: 5,
        },
        {
          Survived: 1,
          Age: 5,

        },
        {
          Survived: 0,
          Age: 25,
        },
        {
          Survived: 0,
          Age: 25,

        }
      ]
    }

    const response = transformData(payload)

    expect(response).toEqual({ "counts": [2, 0, 0, 0] })
  })

  it("should cater for varying amount of bin boundaries", () => {

    const payload = {
      binField: "Age",
      binBoundaries: [10, 20, 50, 70, 90],
      data: [
        {
          Survived: 1,
          Age: 5,
        },
        {
          Survived: 1,
          Age: 15,

        },
        {
          Survived: 1,
          Age: 80,
        },
        {
          Survived: 1,
          Age: 100,
        }

      ]
    }

    const response = transformData(payload)

    expect(response).toEqual({ "counts": [1, 1, 0, 0, 1, 1] })
  })

  test.each([
    ["PassengerId",
      {
        counts: [0,3,1,0]
      }
    ],
    ["Pclass",
      {
        counts: [2,1,1,0]
      }
    ],
    ["Age",
      {
        counts: [0,2,1,1]
      }
    ],
    ["SibSp",
      {
        counts: [1,0,3,0]
      }
    ],
    ["Parch",
      {
        counts: [1,1,0,2]
      }
    ],
    ["Fare",
      {
        counts: [0,0,1,3]
      }
    ],
  ])("should work for %s binFields", (binField, expected) => {

    const payload = {
      binField,
      binBoundaries: [10, 20, 50],
      data: [
        {
          Survived: 1,
          PassengerId: 14,
          Pclass: 6,
          Age: 50,
          SibSp: 35,
          Parch: 1,
          Fare:65,
        },
        {
          Survived: 1,
          PassengerId: 14,
          Pclass: 11,
          Age: 15,
          SibSp: 23,
          Parch: 11,
          Fare: 34,
        },
        {
          Survived: 1,
          PassengerId: 14,
          Pclass: 9,
          Age: 16,
          SibSp: 8,
          Parch: 51,
          Fare: 65,
        },
        {
          Survived: 1,
          PassengerId: 40,
          Pclass: 35,
          Age: 24,
          SibSp: 20,
          Parch: 50,
          Fare: 99,
        }

      ]
    }

    const response = transformData(payload)

    expect(response).toEqual(expected)
  })

  it.todo("should cater for null values")

})

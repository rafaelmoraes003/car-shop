export const motorcycleMock = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  status: true,
  engineCapacity: 125
}

export const motorcycleMockWithId = {
  _id: "4edd40c86762e0fb12000003",
  ...motorcycleMock,
}

export const updatedMotorcycleMock = {
  ...motorcycleMock,
  model: 'Biz'
}

export const updatedMotorcycleMockWithId = {
  _id: motorcycleMockWithId._id,
  ...updatedMotorcycleMock,
}
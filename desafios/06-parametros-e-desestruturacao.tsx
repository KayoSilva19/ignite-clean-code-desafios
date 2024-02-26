function updateUserRoute({ body, params }) {
  const { name, email, password } = body
  const { id } = params

  updateUserController({
    body: { name, email, password },
    params: { id }
  })
}

function updateUserController({ data, params }) {
  userRepository.update(data, params)
}

const userRepository = {
  update: (data, params) => {
    const { name, email, password } = data
    const { id } = params

    return { name, email, password, id }
  },
}
// Nomenclatura de variáveis

const listTypeCategories = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUser(req, res) {
  const userNameGitHub = String(req.query.username)

  if (!userNameGitHub) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const searchUserNameInGitHub = await fetch(`https://api.github.com/users/${userNameGitHub}`);

  if (searchUserNameInGitHub.status === 404) {
    return res.status(400).json({
      message: `User with username "${userNameGitHub}" not found`
    })
  }

  const InfoUserGitHub = await searchUserNameInGitHub.json()

  const orderListByTypeCategory = listTypeCategories.sort((a, b) =>  b.followers - a.followers); 

  const UserCategory = orderListByTypeCategory.find(i => InfoUserGitHub.followers > i.followers)

  const UserGitHub = {
    userNameGitHub,
    category: UserCategory.title
  }

  return UserGitHub
}

getUser({ query: {
  username: 'josepholiveira'
}}, {})
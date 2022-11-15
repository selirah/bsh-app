import { Avatar } from '../components'

export default function Home() {
  return (
    <div className="px-8">
      <h1 className="text-h1 font-lato font-regular text-primaryDark">Welcome</h1>
      <Avatar
        type="image"
        size="md"
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
        initials="ES"
        circular
      />
    </div>
  )
}

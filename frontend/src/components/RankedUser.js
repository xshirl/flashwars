const RankedUser = ({ username, rank, points }) => {
  return (
    <div className="rankedUser">
      <span>{rank} </span>
      <span>{username} </span>
      <span>{points}</span>
    </div>
  )
}

export default RankedUser

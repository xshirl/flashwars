const RankedUser = ({ username, rank, points }) => {
  return (
    <div>
      <span>{rank} </span>
      <span>{username} </span>
      <span>{points}</span>
    </div>
  )
}

export default RankedUser
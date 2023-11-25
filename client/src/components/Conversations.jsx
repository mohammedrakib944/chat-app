const Conversations = ({ conversation = [], setCurrentChat }) => {
  return (
    <ul>
      {conversation.length > 0 &&
        conversation.map((item) => (
          <li key={item._id} onClick={() => setCurrentChat(item)}>
            {item.members[0]} - {item.members[1]}
          </li>
        ))}
    </ul>
  );
};

export default Conversations;

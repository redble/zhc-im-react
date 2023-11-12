export default (g) => {
  let c = g;
  c({ nick: "Dr0", trip: "114514", text: "test", trusted: true, isBot: true });
  c({ nick: "Dr0", trip: "114514", text: "test", mod: true, isBot: true });
  c({ nick: "Dr0", trip: "114514", text: "test", admin: true, isBot: true });
  c({ nick: "Dr0", trip: "114514", text: "test", roomop: true, isBot: true });
  c({
    nick: "Dr0",
    trip: "114514",
    text: "test",
    channelOwner: true,
    isBot: true,
  });

  c({ nick: "Dr0_", trip: "114514", text: "test", trusted: true, isBot: true });
  c({ nick: "Dr0_", trip: "114514", text: "test", mod: true, isBot: true });
  c({ nick: "Dr0_", trip: "114514", text: "test", admin: true, isBot: true });
  c({ nick: "Dr0_", trip: "114514", text: "test", roomop: true, isBot: true });
  c({
    nick: "Dr0_",
    trip: "114514",
    text: "test",
    channelOwner: true,
    isBot: true,
  });
};

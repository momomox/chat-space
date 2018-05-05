json.array! @newmsgs do |newmsg|
  json.user_name newmsg.user.name
  json.date newmsg.created_at
  json.content newmsg.content
  json.id newmsg.id
  json.image newmsg.image.url
end

function isValidUrl(url) {
  const urlRegExp =
    /[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)?/gi;

  const regex = new RegExp(urlRegExp);

  return regex.test(url);
}

export default isValidUrl;

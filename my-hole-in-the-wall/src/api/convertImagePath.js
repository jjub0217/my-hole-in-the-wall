const convertImagePath = (data, baseUrl) => {
  if (!data) return data;

  const newPlaces = data.places?.map((place) => ({
    ...place,
    image: {
      ...place.image,
      src: `${baseUrl}/${place.image?.src || "default.png"}`,
    },
  }));

  return { ...data, places: newPlaces };
};
export default convertImagePath;

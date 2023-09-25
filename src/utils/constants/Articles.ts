export const RibonOnboarding = (t: any) => ({
  id: 1,
  title: t("onboarding.title"),
  author: {
    id: 1,
    name: "Ribon",
  },
  visible: true,
  publishedAt: new Date().toISOString(),
  publishedAtInWords: t("onboarding.publishedAt"),
  createdAt: "2021-09-01T00:00:00.000Z",
  updatedAt: "2021-09-01T00:00:00.000Z",
  imageUrl:
    "https://i.pinimg.com/564x/59/19/d0/5919d00855a72ea34f9f67749779c55c.jpg",
});

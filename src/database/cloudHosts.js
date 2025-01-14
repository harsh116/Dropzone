export const cloudHosts = [
  {
    name: "catbox.moe",
    description: "**Make sure that files don't exceed 200mb**",
    limitInMB: 200,
  },

  {
    name: "sirv.com",
    description:
      "**Make sure that files don't exceed 50mb**. Total size is 500 mb so once it is filled no more upload will be possible",
    limitInMB: 50,
  },
  {
    name: "fileditch.com",
    description: "**Make sure that files don't exceed 15gb**",
    limitInMB: 15000,
  },

  {
    name: "cloudinary.com",
    description:
      "**Make sure that video files don't exceed 100mb and other files dont exceed 10 mb**. Total size is 25 gb so once it is filled no more upload will be possible ",
    limitInMB: 100,
  },

  {
    name: "nextcloud.com",
    description:
      "**Make sure that files don't exceed 1gb**, Total size is 15 gb so once it is filled no more upload will be possible",
    limitInMB: 1024,
  },

  {
    name: "uploadcare.com",
    description: "**Make sure that files don't exceed 10mb**",
    limitInMB: 10,
  },
  {
    name: "0x0.st",
    description:
      "**Make sure that files don't exceed 512mb**\nThis is temporary storage file will be start deleting after 30 days",
    limitInMB: 512,
  },
  {
    name: "transfer.sh",
    description:
      "**Make sure that files don't exceed 10gb**.\n This is temporary storage file will be deleted in 14 days",
    limitInMB: 10000,
  },
];

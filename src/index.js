import "./pages/index.css";

import { showCards } from "./scripts/cards/card";
import { initProfileEditButton } from "./scripts/forms/editProfileForm";
import { initProfileAddButton } from "./scripts/forms/newCardForm";
import { initPopups } from "./scripts/modal";

initProfileEditButton();
initProfileAddButton();

initPopups();

showCards();

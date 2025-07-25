import { createLoader } from "nuqs/server";

import { filterParams } from "../../schemas";

/**
 * Loader function to load product filter parameters using Nuqs.
 * It uses the filterScheme to define the structure and parsing of the parameters.
 *
 * @returns {Object} The loader function for product filter parameters.
 */

export const loadProductFilterParams = createLoader(filterParams);

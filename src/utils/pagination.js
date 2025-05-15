const paginateSequelize = async (
  model,
  {
    page = 0,
    limit = 10,
    order = [['createdAt', 'DESC']],
    where = {},
    include = [],
    attributes = null,
  } = {}
) => {
  const offset = parseInt(page) * parseInt(limit);
  const queryOptions = {
    where,
    include,
    limit: parseInt(limit),
    offset,
    order,
  };

  if (attributes) queryOptions.attributes = attributes;

  const result = await model.findAndCountAll(queryOptions);

  return {
    pagination: {
      currentPage: parseInt(page),
      totalPage: Math.ceil(result.count / limit),
      totalItems: result.count,
    },
    items: result.rows,
  };
};
// Example usage
//  const getPaginatedDonors = async (req, res) => {
//   const { page, limit } = req.query;
//   const paginatedDonors = await paginateSequelize(LactaneDonor, {
//     page: page || 0,
//     limit: limit || 10,
//     order: [['createdAt', 'DESC']],
//     where: { is_active: true },
//     include: [{ model: LactaneHealthHistory, as: 'healthHistory' }],
//   });
//   res.status(200).json(paginatedDonors);
// };
export default paginateSequelize;

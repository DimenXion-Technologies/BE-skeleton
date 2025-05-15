import LactaneDonor from '../../models/lactaneDonor.js';
import { sendSuccess, sendError } from '../../utils/response.js';
import HttpStatusCode from '../../utils/http-status-code.js';
import paginateSequelize from '../../utils/pagination.js';

// Create a new donor
export const createDonor = async (req, res) => {
  try {
    const donor = await LactaneDonor.create(req.body);
    if (!donor) {
      return res.status(400).json({ message: 'Failed to create donor' });
    }
    sendSuccess(
      res,
      {
        id: donor.id,
        first_name: donor.first_name,
        last_name: donor.last_name,
        email: donor.email,
      },
      'Lactane Donor created successfully',
      201
    );
  } catch (error) {
    sendError(res, error.message, HttpStatusCode.BAD_REQUEST);
  }
};

// Get all donors
export const getAllDonors = async (req, res) => {
  try {
    let {
      page = 0,
      limit = 10,
      status, // optional filter
      order = 'ASC',
      orderBy = 'createdAt',
    } = req.query;

    // Ensure page and limit are numbers
    page = parseInt(page);
    limit = parseInt(limit);
    if (isNaN(page) || page < 0) page = 0;
    if (isNaN(limit) || limit <= 0) limit = 10;

    // Normalize order
    order = order.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';

    // Build filtering clause
    const where = {};
    if (status) where.status = status;

    // Fetch paginated data
    const result = await paginateSequelize(LactaneDonor, {
      page,
      limit,
      where,
      order: [[orderBy, order]],
    });

    sendSuccess(res, result);
  } catch (error) {
    console.error('getAllDonors error:', error);
    sendError(res, 'Error fetching donors', HttpStatusCode.INTERNAL_SERVER);
  }
};

// Get donor by ID
export const getDonorById = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await LactaneDonor.findByPk(id);
    if (!donor) {
      sendError(res, 'Donor not found', HttpStatusCode.NOT_FOUND);
    }
    sendSuccess(res, donor);
  } catch (error) {
    sendError(res, 'Error fetching donor', HttpStatusCode.INTERNAL_SERVER);
  }
};

// Update donor
export const updateDonor = async (req, res) => {
  try {
    const { id } = req.params;

    // Find donor by primary key
    const donor = await LactaneDonor.findByPk(id);
    if (!donor) {
      sendError(res, 'Donor not found', HttpStatusCode.NOT_FOUND);
    }

    // Optionally: restrict which fields can be updated
    const updatableFields = [
      'uhid',
      'hospital_id',
      'first_name',
      'last_name',
      'date_of_birth',
      'gender',
      'phone_number',
      'email',
      'address',
      'city',
      'state',
      'postal_code',
      'country',
      'status',
    ];

    // Filter only allowed fields from req.body
    const updates = {};
    updatableFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    // Perform update
    await donor.update(updates);

    sendSuccess(res, donor, 'Lactane Donor updated successfully');
  } catch (error) {
    console.error('Error updating donor:', error);
    sendError(res, 'Error updating donor', HttpStatusCode.INTERNAL_SERVER);
  }
};

// Delete donor
export const deleteDonor = async (req, res) => {
  try {
    const { id } = req.params;
    const donor = await LactaneDonor.findByPk(id);
    if (!donor) {
      sendError(res, 'Donor not found', HttpStatusCode.NOT_FOUND);
    }

    await donor.destroy();
    sendSuccess(
      res,
      null,
      'Lactane Donor deleted successfully',
      HttpStatusCode.OK
    );
  } catch (error) {
    sendError(res, 'Error deleting donor', HttpStatusCode.INTERNAL_SERVER);
  }
};

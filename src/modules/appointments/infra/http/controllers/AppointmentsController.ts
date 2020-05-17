import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentsService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createAppointmentsService = container.resolve(
      CreateAppointmentsService,
    );

    const user_id = request.user.id;
    const { provider_id, date } = request.body;

    const appointment = await createAppointmentsService.execute({
      user_id,
      provider_id,
      date,
    });

    return response.json(appointment);
  }
}

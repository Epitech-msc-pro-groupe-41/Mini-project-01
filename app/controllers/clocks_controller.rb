class ClocksController < ApplicationController

  def index
    user = get_user_from_id

    unless user
      return
    end

    clocks = Clock.where(user: user._id)

    if clocks.nil? || clocks.empty?
      render status: 400, json: {message: 'No clock found.'}
      return
    end
    render status: 200, json: {message: 'Clocks found.', clocks: clocks}

  end

  def create

    if params[:time].nil?
      render status: 400, json: {message: 'Param time not specified.'}
      return
    end

    if params[:status].nil?
      render status: 400, json: {message: 'Param status not specified.'}
      return
    end

    user = get_user_from_id

    unless user
      return
    end

    clock = Clock.where(user: user._id).first

    if clock.nil?
      if params[:status] == false
        render status: 400, json: {message: "No clock already clocked'in."}
        return
      else
        begin
          clock = Clock.create!(time: params[:time], status: params[:status], user: user._id)
        rescue => err
          render status: 400, json: {message: "Clock creation: #{err}"}
          return
        end
        render status: 200, json: {message: "Clock successfully clock'in.", clock: clock}
        return
      end

    elsif clock.status == params[:status]
      render status: 400, json: {message: "Clock status already on #{params[:status]}."}
      return
    else
      begin
        clock.update_attributes!(status: params[:status], time: params[:time])
      rescue => err
        render status: 400, json: {message: "Clocking : #{err}."}
        return
      end
      render status: 200, json: {message: clock.status ? "Clock clocked'in." : "Clock clocked'out."}
    end
  end
end
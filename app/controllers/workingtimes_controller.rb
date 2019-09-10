class WorkingtimesController < ApplicationController

  def index

    user = get_user_from_id
    unless user
      return
    end

    workingtimes = if params[:start] && params[:end]
                     Workingtime.where(user: user.id, start: params[:start], end: params[:end])
                   elsif params[:start]
                     Workingtime.where(user: user.id, start: params[:start])
                   elsif params[:end]
                     Workingtime.where(user: user.id, start: params[:end])
                   else
                     Workingtime.where(user: user.id)
                   end

    if workingtimes.nil? || workingtimes.empty?
      render status: 400, json: {message: "No Workingtimes found."}
      return
    end
    render status: 200, json: {message: "Workingtimes found.", workingtimes: workingtimes}
  end

  def show
    user = get_user_from_id
    unless user
      return
    end

    if params[:workgingtimeID].nil?
      render status: 400, json: {message: "No WorkingTime Id specified."}
      return
    end

    workingtime = Workingtime.where(_id: params[:workgingtimeID]).first

    unless workingtime
      render status: 400, json: {message: "No WorkingTime found with this id."}
      return
    end

    unless workingtime.user == user._id
      render status: 400, json: {message: "User not in workingtime."}
      return
    end

    render status: 200, json: {message: "Workingtime found.", workingtime: workingtime}
  end

  def create
    user = get_user_from_id
    unless user
      return
    end

    unless params[:start]
      render status: 400, json: {message: "Start param not specified."}
      return
    end

    unless params[:end]
      render status: 400, json: {message: "End param not specified."}
      return
    end

    begin
      workingtime = Workingtime.create!(start: params[:start], end: params[:end], user: user._id)
    rescue => err
      render status: 400, json: {message: "Workingtime not created: #{err}."}
      return
    end
    render status: 200, json: {message: 'Workingtime created.', workingtime: workingtime}
  end

  def update

    start = params[:start]
    end_params = params[:end]

    if start.nil? && end_params.nil?
      render status: 400, json: {message: "No valid arguments specified."}
      return
    end

    unless params[:id]
      render status: 400, json: {message: "No id specified."}
      return
    end

    workingtime = Workingtime.where(_id: params[:id]).first

    if workingtime.nil?
      render status: 400, json: {message: "No workingTime found."}
      return
    end

    if start
      workingtime.update_attribute(:start, start)
    end
    if end_params
      workingtime.update_attribute(:end, end_params)
    end

    render status: 200, json: {message: 'Workingtime updated.', workingtime: workingtime}

  end

  def destroy
    unless params[:id]
      render status: 400, json: {message: "No id specified."}
      return
    end

    workingtime = Workingtime.where(_id: params[:id]).first

    if workingtime.nil?
      render status: 400, json: {message: "No workingTime found."}
      return
    end

    workingtime.destroy
    render status: 200, json: {message: 'Workingtime deleted.'}
  end

end
class ApplicationController < ActionController::API

  def get_user_from_id
    if params[:id].blank?
      render status: 400, json: {message: "Id not specified."}
      return nil
    end

    user = User.where(_id: params[:id]).first

    if user.nil?
      render status: 400, json: {message: "No User found."}
      return nil
    end

    return user
  end
end

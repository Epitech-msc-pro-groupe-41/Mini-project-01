class Workingtime
  include Mongoid::Document

  field :start, type: Time
  field :end, type: Time
  field :user, type: BSON::ObjectId
end
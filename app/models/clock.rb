class Clock
  include Mongoid::Document

  field :time, type: Integer
  field :status, type: Boolean
  field :user, type: BSON::ObjectId
end
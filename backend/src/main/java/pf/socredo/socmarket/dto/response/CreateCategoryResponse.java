package pf.socredo.socmarket.dto.response;

public class CreateCategoryResponse {

  private String Message;

  public CreateCategoryResponse(String Message) {

    this.Message = Message;
  }

  public CreateCategoryResponse() {
    //Auto-generated constructor stub
  }

  public String getMessage() {
    return Message;
  }

  public void setMessage(String message) {  
    this.Message = message;
  }

  public static class Builder {
    private String Message;

    public Builder Message(String Message) {
      this.Message = Message;
      return this;
    }

    public CreateCategoryResponse build() {
      return new CreateCategoryResponse(Message);
    }
  }
  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    CreateCategoryResponse other = (CreateCategoryResponse) obj;
    if (Message == null) {
      if (other.Message != null)
        return false;
    } else if (!Message.equals(other.Message))
      return false;
    return true;
  }

  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((Message == null) ? 0 : Message.hashCode());
    return result;
  }

  @Override
  public String toString() {
    return "CategoryResponse [ Message=" + Message + "]";
  }
}
 
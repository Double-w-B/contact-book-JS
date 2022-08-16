export const addEditModalStructure = `<form>
                        <div class="info-one">
                            <div class="name-input">
                                <input type="text" id="name" name="name" title="- only Latin characters" required>
                                    <label>Name<span>*</span></label>
                                    <div class="error-hint">invalid name</div>
                                    <div class="error-hint-required">name is required</div>
                            </div>

                            <div class="surname-input">
                                <input type="text" id="surname" name="surname" title="- only Latin characters" required>
                                    <label>Surname<span>*</span></label>
                                    <div class="error-hint">invalid surname</div>
                                    <div class="error-hint-required">surname is required</div>
                            </div>
                            </div>

                            <div class="info-two">
                            <div class="phone-input">
                                <input type="text" id="phone" name="phone" maxlength="9" title="- only numbers &#013- from 6 to 9 characters" required>
                                    <label>Phone<span>*</span></label>
                                    <div class="error-hint">invalid number</div>
                                    <div class="error-hint-length">min. 6 characters</div>
                                    <div class="error-hint-required">number is required</div>
                                    <div class="error-hint-number">number already exists</div>
                            </div>

                            <div class="mail-input">
                                <input type="text" id="email" name="email" 
                                title="- e.g. name@mail.com"required>
                                    <label>Email</label>
                                    <div class="error-hint">invalid email</div>
                            </div>
                            </div>
                        </form>
                    </div>

                    <div class="new-con-secondary-info">
                        <form>
                            <div class="address-input">
                                <input type="text" id="address" name="address" maxlength="28" title='- max. 28 characters' required>
                                    <label>Address</label>
                            </div>
                            <div class="notes-input">
                                <input type="text" id="notes" name="notes" maxlength="30" title='- max. 30 characters' required>
                                    <label>Notes</label>
                            </div>
                        </form>
                    </div>
                    <div class="new-con-btns">`;

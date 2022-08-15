export const addEditModalStructure = `<form>
                        <div class="info-one">
                            <div class="name-input">
                                <input type="text" id="name" name="name" required>
                                    <label>Name<span>*</span></label>
                                    <div class="error-hint">invalid name</div>
                                    <div class="error-hint-required">name is required</div>
                            </div>

                            <div class="surname-input">
                                <input type="text" id="surname" name="surname" required>
                                    <label>Surname<span>*</span></label>
                                    <div class="error-hint">invalid surname</div>
                                    <div class="error-hint-required">surname is required</div>
                            </div>
                            </div>

                            <div class="info-two">
                            <div class="phone-input">
                                <input type="text" id="phone" name="phone" maxlength="9" required>
                                    <label>Phone<span>*</span></label>
                                    <div class="error-hint">invalid number</div>
                                    <div class="error-hint-required">number is required</div>
                                    <div class="error-hint-number">number already exists</div>
                            </div>

                            <div class="mail-input">
                                <input type="text" id="email" name="email" required>
                                    <label>Email</label>
                                    <div class="error-hint">invalid email</div>
                            </div>
                            </div>
                        </form>
                    </div>

                    <div class="new-con-secondary-info">
                        <form>
                            <div class="address-input">
                                <input type="text" id="address" name="address" required>
                                    <label>Address</label>
                            </div>
                            <div class="notes-input">
                                <input type="text" id="notes" name="notes" maxlength="30" required>
                                    <label>Notes</label>
                            </div>
                        </form>
                    </div>
                    <div class="new-con-btns">`;
